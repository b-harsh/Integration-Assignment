from fastapi import APIRouter, HTTPException
from app.models.schema import SchemaRequest, IngestionRequest, PreviewRequest
from app.services import ingestion_service, schema_service, preview_service, progress_service

router = APIRouter()

@router.post("/schema/discover")
def discover_schema(request: SchemaRequest):
    try:
        return schema_service.discover_schema(request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ingest/clickhouse-to-file")
def clickhouse_to_file(request: IngestionRequest):
    try:
        result = ingestion_service.clickhouse_to_file(request)
        return {"task_id": result["task_id"], "records_processed": result["records_processed"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ingest/file-to-clickhouse")
def file_to_clickhouse(request: IngestionRequest):
    try:
        result = ingestion_service.file_to_clickhouse(request)
        return {"task_id": result["task_id"], "records_processed": result["records_processed"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ingest/clickhouse-join-to-file")
def clickhouse_join_to_file(request: IngestionRequest):
    try:
        result = ingestion_service.clickhouse_join_to_file(request)
        return {"task_id": result["task_id"], "message": result["message"], "file_path": result["file_path"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/preview")
def preview_data(request: PreviewRequest):  # <-- if you have separate PreviewRequest schema
    try:
        return preview_service.preview_data(request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/ingestion/status/{task_id}")
def get_task_status(task_id: str):
    try:
        return ingestion_service.get_task_status(task_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
