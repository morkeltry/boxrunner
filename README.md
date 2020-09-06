Don't forget:
`sudo ufw allow from 192.168.0.0/24 to any port 7777`
`sudo ufw allow from 192.168.1.0/24 to any port 7777`

(assuming you're using [port 7777](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Registered_ports))

Fragments (`#`) will be chopped off by the browser before they are seen by this server. If you manually escape them (`%23`), the server will replace with a `#`.
