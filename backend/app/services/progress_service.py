# progress_service.py

task_progress = {}

def initialize_task(task_id: str):
    """Initialize task with progress set to 0."""
    task_progress[task_id] = 0

def update_progress(task_id: str, progress: int):
    """Update task progress."""
    if task_id in task_progress:
        task_progress[task_id] = progress
    else:
        raise ValueError(f"Task ID {task_id} not initialized.")

def get_progress(task_id: str):
    """Retrieve the progress of a given task."""
    return task_progress.get(task_id, "Task not found.")
