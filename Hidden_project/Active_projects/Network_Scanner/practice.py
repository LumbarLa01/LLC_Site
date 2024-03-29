import subprocess
import re

First_ip = input("Enter the first IP address: ")
Last_ip = input("Enter the last IP address: ")

def Get_Host(x):

    for i in x:
        Dot_Counter = 0
        Pos_Counter = 0
        if i == ".":
            Dot_Counter = Dot_Counter + 1
        if Dot_Counter == 3:
            return (x[0:Pos_Counter +1], x[Pos_Counter+1: ])
            break
        Pos_Counter += 1


Network, First_host = Get_Host (First_ip)
Network, Last_host = Get_Host (Last_ip)

Empty_String = ""

Counter = 0

for i in range(int(First_Host), int(Last_Host) +1):
    Process =  Subprocess.getoutput("ping -n 1" + Network + str(i))
    Empty_String =+ Process 

    String_Needed = re.compile(r"TTL=")
    mo = String_Needed.search(Empty_String)
    try:
        if mo.group() == "TTL=":
            print("Host " + Network + str(i) + " is UP")
    except:
        print("Host " + Network + str(i) + " is Down")

    Empty_String = ""

print("Completed")
