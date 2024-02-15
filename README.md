## About The Project

This is a simple gist manager, where you can log in on behalf of a user, check all gists, filter by a user and edit the gist (adding more files or updating the existing ones).

---

## Technologies

The project was built using:

- Vue.js
- Pinia
- Tailwind CSS
  For tests:
- Vue Testing library

---

## Running

### :warning: There is a small API running in order to use oauth and not expose github private key. It is deployed to [render](render.com) and since it is a free service the instance may take a while to start, delaying the request to server :warning:

1. Have installed a node > 18 version (if you have `nvm` installed you can set same node version with `nvm use`)
2. Set `.env` variables according your environment
3. Install the dependencies running `yarn`
4. Run locally using `yarn dev`

---

## Roadmap

- [ ] Include add new gist page
- [ ] Include remove file feature
- [ ] Include star/unstart feature
- [ ] Handle errors
- [ ] Handle loading on detail/edit/login pages
