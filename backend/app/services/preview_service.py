from app.services import clickhouse_client
from app.utils import file_handler


def preview_service(request: PreviewRequest):
    query = f"Select {", ".join(request.selected_columns)} from {request.table_name} Limit 100"
    result= clickhouse_client.execute(query)
    return {"data": result}

def preview_file(request: PreviewRequest):
    data = file_handler.read_first_n_lines(request.file_path , 100)
    return {"data": data}