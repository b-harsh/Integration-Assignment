from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ClickHouse <-> FlatFile Ingestion Tool",
    description="Web-based tool for bi-directional ingestion between ClickHouse and Flat Files.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app import routes
app.include_router(routes.router)
