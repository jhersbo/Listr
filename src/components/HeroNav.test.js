// import React from 'react'
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";

// import HeroNav from './HeroNav'

// let container;

// beforeEach(()=>{
//   container = document.createElement('div')
//   document.body.appendChild(container)
// })

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it('renders Nav properly from users data', async ()=>{
//     const fakeUser = {
//         user_id: 22341,
//         name: 'Jack Ersbo',
//         username: "jhersbo",
//         password: '1234'
//     }
//     jest.spyOn(global, 'fetch').mockImplementation(()=>{
//         Promise.resolve({
//             json: () => Promise.resolve(fakeUser)
//         })
//     })
//     act(()=>{
//         render(<HeroNav user={fakeUser}></HeroNav>, container)
//     })
//     expect(container.textContent).toContain(fakeUser.username.charAt(0))
//     global.fetch.mockRestore();
// })