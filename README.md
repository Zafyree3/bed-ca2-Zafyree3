# Irman BED CA1 Project

## Idea

A Neko Atsume like game

## Gameplay

1. Users will complete tasks to earn points
   - Task will be generated and created by an admin,
   - Task points will be given to the users after completion
2. Users can use the points to buy:
   - Items from a shop, items can:
     - Attract a certain type of cat (ie increase chance of getting it)
     - Allow user to lure (steal) other users' cats
     - Protect cats from being stolen by others
     - Increase the points gain from completing a task
   - Gacha for cats
     - There will be different type of gachas, each having different cats with unique drop ratc
     - Items can increase the chance of a certain cat to be dropped
3. User can display their cats in a field
   - These cats will be shown to others when other view the user
   - These cats will have a higher chance of being lured
   - Cats in here will activate their ability
     - Cat's ability can range from
       - More point
       - More chance of stealing other cats
       - Increase drop rates of other cates
       - Protect other cats
4. Users can search for players and lure their cats
   - When luring, it will randomly pick a cat from the victim's field
   - Will be based on a chance
   - Chance to lure can be increase by items and cats
   - Chance to lure can also be decrease by items and cats

## Roadmap

### Users

- [ ] create new user
- [ ] read all users
- [ ] read user by id
- [ ] update user by id
- [ ] delete user by id

- [ ] add new cats to display
- [ ] remove cats from display
- [ ] read cats in their fields

### Tasks

- [ ] create new task
- [ ] read all tasks
- [ ] read task by id
- [ ] update task by id
- [ ] delete user by id

### Tasks Progress

- [ ] create new task progress for user
- [ ] read all task progress by user
- [ ] read specific task progress by id
- [ ] update task progress by id
- [ ] delete task progress by id

### Cats

- [ ] create new cats
- [ ] read all available cats
- [ ] read cat details by id
- [ ] update cat details by id
- [ ] delete cat by id

### Cats Owned

- [ ] create new cat for owner
- [ ] read all cats owned
- [ ] read all cats by owner id
- [ ] read cats owned details by id
- [ ] update cat owned details by id
- [ ] delete cat owned by id

### Gacha

- [ ] create new gacha with cats
- [ ] read all available gachas
- [ ] read gacha details with cats details by id
- [ ] update gacha details by id
- [ ] delete gacha by id

### Item

- [ ] create new item
- [ ] read all available items
- [ ] read item details by id
- [ ] update item details by id
- [ ] delete item by id

### Shop

- [ ] read all things in shop (items, gachas)
- [ ] read all items details in shop
- [ ] read all gachas details in shop
- [ ] buy items in shop
- [ ] buy gachas in shop

### Attack

- [ ] lure cats from owner
