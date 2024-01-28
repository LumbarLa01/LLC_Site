from scapy.all import ARP, Ether, srp
import argparse

def scan_ip_range(start, end, subnet):
    # Create an IP address range
    ip_range = f"{subnet}.{start}-{subnet}.{end}"
    # Create an ARP request packet
    arp_request = ARP(pdst=ip_range)
    # Create an Ethernet frame
    broadcast = Ether(dst="ff:ff:ff:ff:ff:ff")
    # Combine the ARP request with the Ethernet frame
    arp_request_broadcast = broadcast/arp_request
    # Send the packet and receive any responses
    answered_list = srp(arp_request_broadcast, timeout=1, verbose=False)[0]

    # List of discovered devices
    devices = []
    for sent, received in answered_list:
        # For each response, add IP and MAC address to the list
        devices.append({'ip': received.psrc, 'mac': received.hwsrc})

    return devices

def main(start, end, subnet):
    devices = scan_ip_range(start, end, subnet)
    for device in devices:
        print(f"IP Address: {device['ip']}, MAC Address: {device['mac']}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Network Device Scanner')
    parser.add_argument('--start', type=int, help='Start of IP range', required=True)
    parser.add_argument('--end', type=int, help='End of IP range', required=True)
    parser.add_argument('--subnet', type=str, help='Subnet', required=True)
    args = parser.parse_args()

    main(args.start, args.end, args.subnet)
