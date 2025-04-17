import pandas as pd


def read_file(file_name , delimiter):
    df = pd.read_csv(file_name , delimiter=delimiter)
    return df


def write_file(file_name , df , delimiter):
    df.to_csv(file_name , index = false, sep = delimiter)