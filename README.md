# Telnyx test task
> Add a blog feed feature to our seed application. This feature should live in a new page that shows all blog posts, sorted by publish date. Users should also be able to view individual blog posts in a separate page, where they can read comments and add a comment to the post  

## Resulting app
- All Business and Technical requirements were met.  
- Works in all major browsers (IE11+)

## Architecture
- I decided not to use Redux to reduce boilerplate and facilitate a process of code review. Simple container components + stateless components were used instead.

## Unit testing
- All components in the `blog` folder are covered in unit tests.  
- **[Enzyme](https://github.com/airbnb/enzyme)** library was utilized as a testing helper.  
- Components inside `post` category weren't tested because of time consumption. If you need the whole app to be covered for review process let me know please.
