from pydantic import BaseModel
from typing import List, Optional

class SchemaRequest(BaseModel):
    source_type : str
    host: Optional[str] = None
    port: Optional[int] = None
    database: Optional[str] = None
    user: Optional[str] = None
    jwt_token: Optional[str] = None
    table_name: Optional[str] = None
    file_name: Optional[str] = None
    delimiter: Optional[str] = ","
    
class IngestionRequest(SchemaRequest):
    columns: List[str]
    table_names: Optional[List[str]] = None
    join_conditions: Optional[str] = None
    preview_limit : Optional[int] = None
    
class PreviewRequest(SchemaRequest):
    columns: Optional[List[str]] = None
    table_name : Optional[List[str]] = None
    join_conditions: Optional[str] = None
    preview_limit: Optional[int] = 100