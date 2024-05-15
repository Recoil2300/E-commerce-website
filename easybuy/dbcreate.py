import sqlite3
conn = sqlite3.connect('easybuy.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS User
             (Name text,ID real,Phone real,Password text)''')
conn.commit()

# 关闭Cursor和连接
c.close()
conn.close()