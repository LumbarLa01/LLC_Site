import subprocess

# Looping through numbers 1 to 56
for ping in range(1, 57):
    # Constructing an IP address string for each iteration. 
    # It starts with "10.0.0." and adds the current number from the loop.
    address = "10.0.0." + str(ping)

    # Using the subprocess module to execute the ping command.
    # '-c 3' option sends 3 packets to the address. The result of the ping command is stored in 'res'.
    res = subprocess.call(['ping', '-c', '3', address])

    # Checking the result of the ping command
    if res == 0:
        # If 'res' is 0, it means ping was successful.
        print("ping to", address, "OK")
    elif res == 2:
        # If 'res' is 2, it means there was no response from the pinged address.
        print("no response from", address)
    else:
        # For any other result, the ping failed.
        print("ping to", address, "failed!")