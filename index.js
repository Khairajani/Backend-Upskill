const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { DefaultSerializer } = require('v8');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log('Listening at 3000');
});

app.get('/', (req, res) => {
  res.status(200).send('Backend Fundamentals 5 - Assignment');
});

// ======================= BF5 : HW_2 =======================

const instagramUsers = [
  {
    id: 1,
    username: 'wanderlust_dreamer',
    followers: 12000,
    bio: 'Exploring the world one adventure at a time 🌍✈️',
    profilePicture: 'https://example.com/profile1.jpg',
    accountType: 'travel',
  },
  {
    id: 2,
    username: 'foodie_heaven',
    followers: 8500,
    bio: 'Tasting the world, one bite at a time 🍔🍕',
    profilePicture: 'https://example.com/profile2.jpg',
    accountType: 'food',
  },
  {
    id: 3,
    username: 'fitness_freak_99',
    followers: 15000,
    bio: 'Living a healthy life and lifting heavy 🏋️‍♂️💪',
    profilePicture: 'https://example.com/profile3.jpg',
    accountType: 'fitness',
  },
  {
    id: 4,
    username: 'tech_guru',
    followers: 20000,
    bio: 'Tech reviews, tips, and tricks 💻📱',
    profilePicture: 'https://example.com/profile4.jpg',
    accountType: 'technology',
  },
  {
    id: 5,
    username: 'artistic_vibes',
    followers: 5000,
    bio: 'Painting the world with colors and creativity 🎨🖌️',
    profilePicture: 'https://example.com/profile5.jpg',
    accountType: 'art',
  },
  {
    id: 6,
    username: 'nature_lovers',
    followers: 17000,
    bio: 'Celebrating the beauty of nature 🌿🌄',
    profilePicture: 'https://example.com/profile6.jpg',
    accountType: 'nature',
  },
  {
    id: 7,
    username: 'fashionista101',
    followers: 25000,
    bio: 'Your daily dose of style and fashion trends 👗👠',
    profilePicture: 'https://example.com/profile7.jpg',
    accountType: 'fashion',
  },
  {
    id: 8,
    username: 'movie_buff',
    followers: 11000,
    bio: 'Reviews and thoughts on all things cinema 🎥🍿',
    profilePicture: 'https://example.com/profile8.jpg',
    accountType: 'entertainment',
  },
  {
    id: 9,
    username: 'gaming_legends',
    followers: 30000,
    bio: 'Streaming games and sharing tips 🎮🔥',
    profilePicture: 'https://example.com/profile9.jpg',
    accountType: 'gaming',
  },
  {
    id: 10,
    username: 'bookworm_corner',
    followers: 7000,
    bio: 'Books, reviews, and more 📚✨',
    profilePicture: 'https://example.com/profile10.jpg',
    accountType: 'books',
  },
];

console.log(instagramUsers);

// GET all users --> /users
app.get('/api/v1.0/users', (req, res) => {
  res.status(200).json({ users: instagramUsers });

  // Cutshort for Brainy Reasons
  // res.status(200).json({ message: `<List of Instagram Users>` });
});

// GET user details by id --> /users/1
app.get('/api/v1.0/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  const user = instagramUsers.find((user) => user.id === id);
  if (user === undefined) {
    res.status(404).send('not found');
  } else {
    res.status(200).json({ details: user });
  }

  // Cutshort for Brainy Reasons
  // res.status(200).json({ message: `Details for User ID:  ${id}`
});

function createUserObject(username) {
  const check_user_existance = instagramUsers.find(
    (user) => user.username === username
  );
  new_user = undefined;
  if (check_user_existance === undefined) {
    new_user = { id: instagramUsers.length + 1, username: username };
  }
  return new_user;
}

// POST new user --> /users/?username=khairajani
app.post('/api/v1.0/users', (req, res) => {
  // let username = req.query.username;
  console.log(req.body);
  const username = req.body.username;
  let newUser = createUserObject(username);
  if (newUser === undefined) {
    res.status(400).json({ message: `username '${username}' not available` });
  } else {
    instagramUsers.push(newUser);
    res.status(201).json({ 'User added successfully': newUser });
  }
});

function updateUser(userID, bio, account_type) {
  user_to_update = undefined;
  users_length = instagramUsers.length;
  for (let i = 0; i < users_length; i++) {
    if (instagramUsers[i]['id'] === userID) {
      user_to_update = instagramUsers[i];
      instagramUsers.splice(i, 1);
      console.log('Gotcha');
      break;
    }
  }
  if (user_to_update !== undefined) {
    user_to_update['bio'] = bio;
    user_to_update['account_type'] = account_type;
    console.log('updating user..');
  }
  return user_to_update;
}

// PUT update existing user --> /users/11?bio=Code%20n%20Cure&account_type=coding
app.put('/api/v1.0/users/:id', (req, res) => {
  let id = parseInt(req.params.id);
  console.log(req.body);
  const bio = req.body.bio;
  const account = req.body.account_type;
  let updatedUser = updateUser(id, bio, account);
  if (updatedUser === undefined) {
    res.status(400).json({ message: `User with ID ${id} not found` });
  } else {
    instagramUsers.push(updatedUser);
    res.status(200).json({ 'User updated successfully': updatedUser });
  }
});
