# N-Mario

## Background Story

In the good old days, only 1 Queen was kidnapped and only 1 Mario was needed to save the queen. Nowadays, we all know that there exists a N-Queen problem, so we need N-Mario to solve it.

## Idea

The game is a 2D platform side­scroller with multiple players. All players play the same stage simultaneously. All players start at the leftmost side of the stage. To clear a stage, the players must reach the goal at the rightmost side of the stage.

## Features

1. Real-time synchronized gameplay
2. Challenges that require players to cooperate or compete
3. Various obstacles, enemies and power-ups

## Programming Challenges

1. Physics engine (phaser.io)
2. WebSocket (socket.io)

## Deployment Scenarios

1. Github Pages (for static contents)
2. Department Machines (for node.js server)

## Milestones

| Section | Group | Details                                  | Score |
|---------|:-----:|------------------------------------------|:-----:|
| Core    | A     | **Characters**                           | 5     |
|         |       | 1. Showing and controlling own character |       |
|         |       | 2. Showing other characters              |       |
|         | B     | **Game components**                      | 10    |
|         |       | 1. Obstacle                              |       |
|         |       | 2. Monster                               |       |
|         |       | **Transitions**                          |       |
|         |       | 1. End game                              |       |
|         |       | 2. Transit to next level                 |       |
| Extra   | C     | **Game components**                      | 3     |
|         |       | 1. Power-ups                             |       |
|         | D     | **Level design components**              | 7     |
|         |       | 1. Cooperation                           |       |
|         |       | 2. Competition                           |       |
| Room    | E     | **Game rooms**                           | 5     |
|         |       | 1. List of available room                |       |
|         |       | 2. Waiting game to start                 |       |

## Code Usage

### Client Side

1. Client side is directly accessible from [N-Mario's Github Page](https://cherrry.github.io/N-Mario).
2. Player may enter a server address with port number after page load.
3. Player may change his/her name by clicking the top-right box.
4. Other usage are quite trivial.

### Server Side

1. Server can be cloned from [cherrry/Node-Mario](https://www.github.com/cherrry/Node-Mario) using `git clone git@github.com:cherrry/Node-Mario.git`.

2. Inside the folder, run `npm install`, then `node server.js`.
3. By default, player access the server via `localhost:21474`, and it is set to allow `cherrry.github.io` to perform cross domain request.
