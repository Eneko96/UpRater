#!/bin/bash
source scripts/print_color.sh
echo "Running dev docker server with hot reloading"

function loader() {
  local pid=$!
  local delay=0.5
  local spinstr='|/-\'
  while [ "$(docker ps >/dev/null 2>&1; echo $?)" -ne 0 ]; do
    local temp=${spinstr#?}
    printf " [%c] %s " "$spinstr" "$1"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\r"
  done
  printf "    \r"
}

if ! docker ps >/dev/null 2>&1; then
  # If Docker is not running, start it
  print_color yellow "Docker is not running, starting Docker..."
  osascript -e 'tell application "Docker" to activate'
  loader "Waiting for Docker to start..."
  print_color green "Docker is now running!"
fi


# Build and run the docker image
docker-compose -f docker-compose.mdb.dev.yml build && ./dbstart.sh

# enable rabbitmq management plugin
docker exec -it rabbit rabbitmq-plugins enable rabbitmq_management

# Run Docker loggers in separate tabs
gnome-terminal --tab --title="container1" -- bash -c "docker logs -f container1" \
               --tab --title="container2" -- bash -c "docker logs -f container2" \
               --tab --title="container3" -- bash -c "docker logs -f container3" \
               --tab --title="container4" -- bash -c "docker logs -f container4"

# Wait for the Docker loggers to finish running
wait

# Split the terminal into 3 panes
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+shift+t
xdotool key ctrl+super+Right
xdotool key ctrl+shift+t
xdotool key ctrl+super+Down

docker ps --format "{{.Names}}`t{{.ID}}"

