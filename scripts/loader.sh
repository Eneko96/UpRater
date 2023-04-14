function loader {
  local message=$1
  local delay=0.5
  local spin='-\|/'

  echo -n "$message "

  while true; do
    local temp=${spin#?}
    printf " [%c]  " "$spin"
    spin=$temp${spin%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
}