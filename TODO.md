# Never-Ending Lists of Things

## Things I’m Tasked With

### Build

- [ ] Banner Component
  - [ ] Placement
  - [ ] Carousel
  - [ ] Data Populated
  - [ ] Styled
  - [ ] A11y
- [ ] Promo Component
  - [ ] Placement
  - [ ] Data Populated
  - [ ] Styled
  - [ ] A11y
- [ ] BlogRoll / Page
  - [ ] Routing
  - [ ] Layout
  - [x] Data Populated
  - [ ] Styled
  - [ ] A11y
  - [ ] (sidebar filters?)
  - [ ] (snazzy transitions)
- [ ] Blog / Page
  - [ ] Routing
  - [ ] Layout
  - [x] Data Populated
  - [ ] Styled
  - [ ] A11y
  - [ ] Promo Support
- [ ] NavBar
  - [ ] Layout
  - [x] Data Populated
  - [ ] Styled
  - [ ] A11y
  - [ ] (fancy CSS anchors?)
  - [ ] (keyboard navigable?)
  - [ ] (inert stack below?) 
- [ ] PageLayout Page (arbitrary)
  - [ ] Choose Page
  - [ ] Data Populated
  - [ ] Styled
  - [ ] Integrated loosely w/React app


## Everything Else

### Build

- [ ] Themeable Core Components
  - [ ] `Paragraph`
  - [ ] 

### DevOps

- [x] dev-mode output
  - [x] SWC generates /dist/client live, in watch mode
- [ ] prod-mode output
  - [ ] SWC generates /dist/client
  - [ ] (bundle?)

### Data-Management

- [ ] AuthenticationService
  - [ ] make service
  - [ ] cache bearer token (for session?)
  - [ ] handle 401 / 403 (kill caches, signal back to logout)
- [x] BlogService
  - [x] write BlogCollection IndexedDB store schema
  - [x] cache blog query
  - [x] serve optimistic value
  - [ ] (additional search types? `find_by_tag`?)
  - [ ] (poll and signal new results?)
- [ ] NavBarService
  - [ ] write NavBar IndexedDB store schema 
  - [ ] cache navbar request
  - [ ] serve on authenticated
  - [ ] serve optimistic value
