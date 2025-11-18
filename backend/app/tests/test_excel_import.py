from app.services.excel_import import parse_questions_excel
from openpyxl import Workbook
from io import BytesIO
import json

def build_sample_workbook():
    wb = Workbook()
    ws = wb.active
    ws.append(["title", "description", "complexity", "type", "options", "correct_answers", "max_score", "tags"])
    ws.append([
        "Q1",
        "Desc",
        "Class 1",
        "single_choice",
        json.dumps(["A", "B", "C"]),
        json.dumps("A"),
        1,
        "math,easy",
    ])
    buf = BytesIO()
    wb.save(buf)
    return buf.getvalue()

def test_parse_questions_excel_valid():
    data = build_sample_workbook()
    valid, errors = parse_questions_excel(data)
    assert len(errors) == 0
    assert len(valid) == 1
    assert valid[0]["title"] == "Q1"
