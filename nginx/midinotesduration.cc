server {
    listen 80;
    server_name midinotesduration.cc;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name midinotesduration.cc;

    ssl_certificate /etc/ssl/certs/cloudflare_origin_cert_midinotesduration.cc.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare_origin_key_midinotesduration.cc.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        root /var/www/midinotesduration.cc;
        index index.html;
        try_files $uri $uri/ =404;  # Serve 404 if file not found
        access_log off;
    }
}
