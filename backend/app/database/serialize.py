from sqlalchemy.inspection import inspect


def model_to_dict(obj):
    if obj is None:
        return None
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}
