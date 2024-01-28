import subprocess
import threading
import argparse

# Function to ping a given IP address
def ping_address(ip):
    try:
        # Execute the ping command with a timeout of 1 second
        res = subprocess.run(['ping', '-c', '3', '-W', '1', ip], stdout=subprocess.DEVNULL)
        # Check the result of the ping command
        if res.returncode == 0:
            print(f'Ping to {ip} OK')
        elif res.returncode == 2:
            print(f'No response from {ip}')
        else:
            print(f'Ping to {ip} failed')
    except Exception as e:
        # Handle any exceptions that occur during the ping
        print(f'Error pinging {ip}: {e}')

# Main function to handle network scanning
def main(start, end, subnet):
    threads = []  # List to keep track of threads
    for i in range(start, end):
        ip = f'{subnet}.{i}'  # Construct the IP address
        # Create and start a new thread for each IP address
        thread = threading.Thread(target=ping_address, args=(ip,))
        thread.start()
        threads.append(thread)

    # Wait for all threads to complete
    for thread in threads:
        thread.join()

# Entry point of the script
if __name__ == "__main__":
    # Set up command-line argument parsing
    parser = argparse.ArgumentParser(description='Network Scanner')
    parser.add_argument('--start', type=int, help='Start of IP range', required=True)
    parser.add_argument('--end', type=int, help='End of IP range', required=True)
    parser.add_argument('--subnet', type=str, help='Subnet', required=True)
    args = parser.parse_args()

    # Run the main function with the provided arguments
    main(args.start, args.end, args.subnet)