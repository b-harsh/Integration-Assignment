import pandas as pd
from app.services import clickhouse_client
from app.utils import file_handler


def discover_schema(request):
    if(request.source_type == "clickhouse"):
        client = clickhouse_client,create_client(
            request.host , request.port , request.user , request.jwt_token , request.database
        )
        
        rows = client.query(f"DESCRIBE TABLE {request.table_name}")
        columns = [rows[0] for row in rows.result_rows]
        return columns
    
    elif request.source_type == "flatfile":
        df = file_handler_.read_file(request.file_name , request_delimiter)
        return list(df.columns)
    
    else:
        raise ValueError("Invalid source_type") 