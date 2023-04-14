#!/bin/bash
source scripts/print_color.sh

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


# Execute the rest of the commands here
print_color green "Docker app is now open"

print_color gray "Running dev docker server with hot reloading"

# Build and run the docker image

if docker ps -a | grep -q "node"; then
  print_color yellow "The node container is already running."
else 
  docker-compose -f docker-compose.mdb.dev.yml build && ./dbstart.sh

  # enable rabbitmq management plugin
  docker exec -it rabbit rabbitmq-plugins enable rabbitmq_management
fi

# Run Docker loggers in the background (doesn't work)
# osascript -e 'tell application "Warp" to do script "docker logs -f container1" in tab 1 of window 1' &
# osascript -e 'tell application "Warp" to do script "docker logs -f container2" in tab 2 of window 1' &
# osascript -e 'tell application "Warp" to do script "docker logs -f container3" in tab 3 of window 1' &
# osascript -e 'tell application "Warp" to do script "docker logs -f container4" in tab 4 of window 1' &

# Wait for the Docker loggers to finish running
wait

# Split the terminal into 3 panes
osascript -e 'tell application "Warp" to activate' -e 'tell application "System Events" to keystroke "d" using {command down}' -e 'delay 0.5'
osascript -e 'tell application "Warp" to activate' -e 'tell application "System Events" to keystroke "D" using {shift down, command down}' -e 'delay 0.5'

# Navigate to the left pane
osascript -e 'tell application "Warp" to activate' -e 'tell application "System Events" to key code 123 using {command down, option down}' -e 'delay 0.5'

# Open a new pane below the left pane
osascript -e 'tell application "Warp" to activate' -e 'tell application "System Events" to keystroke "D" using {shift down, command down}' -e 'delay 0.5'

docker ps --format "{{.Names}}\t{{.ID}}"

print_color green "Docker containers are now running, you can copy the instances to your tabs"

# Run a Docker logger in each pane (script doesn't work
# osascript -e 'tell application "Terminal" to do script "docker logs -f node" in tab 1 of window 1'
# osascript -e 'tell application "Warp" to do script "docker logs -f node_rabbit" in tab 2 of window 1'
# osascript -e 'tell application "Warp" to do script "docker logs -f rabbit" in tab 3 of window 1'
# osascript -e 'tell application "Warp" to do script "docker logs -f mongo1" in tab 4 of window 1'