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

- [x] create new user
- [x] read all users
- [x] read user by id
- [x] update user by id
- [x] delete user by id

- [ ] add new cats to display
- [ ] remove cats from display
- [ ] read cats in their fields

### Tasks

- [x] create new task
- [x] read all tasks
- [x] read task by id
- [x] update task by id
- [x] delete user by id

### Tasks Progress

- [x] create new task progress for user
- [x] read all task progress by user
- [x] read specific task progress by id
- [x] update task progress by id
- [x] delete task progress by id

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

- [x] create new gacha with cats
- [x] read all available gachas
- [x] read gacha details with cats details by id
- [x] update gacha details by id
- [x] delete gacha by id

### Item

- [x] create new item
- [x] read all available items
- [x] read item details by id
- [x] update item details by id
- [x] delete item by id

### Shop

- [x] read all things in shop (items, gachas)
- [x] read all items details in shop
- [x] read all gachas details in shop
- [x] buy items in shop
- [x] buy gachas in shop

### Attack

- [ ] lure cats from owner
