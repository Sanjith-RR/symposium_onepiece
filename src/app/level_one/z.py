f=open(r'src\app\level_one\label.txt','r')
f=f.read()
f=f.replace('\n','')

with open("label.txt", "w") as text_file:
    text_file.write(f)
