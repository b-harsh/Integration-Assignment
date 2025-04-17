from app.services import clickhouse_client, progress_service
from app.utils import file_handler
import uuid
from fastapi import HTTPException

def clickhouse_to_file(request):
    task_id = str(uuid.uuid4())
    progress_service.initialize_task(task_id)

    client = clickhouse_client.create_client(
        request.host, request.port, request.user, request.jwt_token, request.database
    )

    query = f"SELECT {', '.join(request.columns)} FROM {request.table_name}"
    result = client.query_df(query)

    progress_service.update_progress(task_id, 50)  # halfway done (data fetched)

    file_handler.write_file(request.file_name, result, request.delimiter)

    progress_service.update_progress(task_id, 100)  # complete

    return {"records_processed": len(result), "task_id": task_id}








def file_to_clickhouse(request):
    task_id = str(uuid.uuid4())
    progress_service.initialize_task(task_id)

    try:
        df = file_handler.read_file(request.file_name, request.delimiter)
    except Exception as e:
        return {"error": f"Failed to read file: {str(e)}"}

    # Validate that columns exist in the file
    missing_columns = [col for col in request.columns if col not in df.columns]
    if missing_columns:
        return {"error": f"Columns not found: {', '.join(missing_columns)}"}

    df_selected = df[request.columns]

    try:
        client = clickhouse_client.create_client(
            request.host, request.port, request.user, request.jwt_token, request.database
        )
    except Exception as e:
        return {"error": f"Failed to connect to ClickHouse: {str(e)}"}

    total_rows = len(df_selected)
    batch_size = request.batch_size if hasattr(request, 'batch_size') else 1000  # Allow batch size customization
    last_update = 0  # To store the last updated progress

    for i in range(0, total_rows, batch_size):
        batch = df_selected.iloc[i:i + batch_size]
        try:
            client.insert_dataframe(request.table_name, batch)
        except Exception as e:
            return {"error": f"Failed to insert data to ClickHouse: {str(e)}"}

        progress = int(((i + batch_size) / total_rows) * 100)
        
        # Update progress only when there's a significant change (e.g., every 5%)
        if progress - last_update >= 5:
            progress_service.update_progress(task_id, min(progress, 100))
            last_update = progress

    progress_service.update_progress(task_id, 100)  # complete

    return {"records_processed": total_rows, "task_id": task_id}




def clickhouse_join_to_file(request):
    task_id = str(uuid.uuid4())
    progress_service.initialize_task(task_id)

    client = clickhouse_client.create_client(
        request.host, request.port, request.user, request.jwt_token, request.database
    )

    table_names = request.table_names
    join_conditions = request.join_conditions

    query = f"SELECT * FROM {' JOIN '.join(table_names)} ON {join_conditions}"
    result = client.query_df(query)

    progress_service.update_progress(task_id, 50)  # halfway done (data fetched)

    file_handler.write_file(request.file_name, result, request.delimiter)

    progress_service.update_progress(task_id, 100)  # complete

    return {"message": "Data ingested successfully", "file_path": request.file_name, "task_id": task_id}


def get_task_status(task_id):
    return {"task_id": task_id, "progress": progress_service.get_progress(task_id)}
