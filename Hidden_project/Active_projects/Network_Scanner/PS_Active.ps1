#Define the start and end of the range in your subnet
$startRange = 1
$endRange = 254
$subnet = "192.168.1"

# Loop through the range and ping each address
for ($i = $startRange; $i -le $endRange; $i++) {
    $ip = "$subnet.$i"
    if (Test-Connection -ComputerName $ip -Count 1 -Quiet) {
        Write-Host "$ip is active"
    }
}