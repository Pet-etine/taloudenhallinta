import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Items from '../Items';
import Root from '../Root';
import Settings from '../Settings';
import Stats from '../Stats';
import AddItem from '../AddItem';
import EditItem from '../EditItem';
import React from "react";

function AppRouter(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Items items={props.items} />,  // Pass items here
          loader: () => { return props.data }
        },
        { 
          path: "stats", 
          element: <Stats data={props.items} /> 
        },
        { 
          path: "settings",
          element: <Settings 
            typelist={props.typelist}
            onTypeSubmit={props.onTypeSubmit}
            user={props.user}
            auth={props.auth} 
          /> 
        },
        {
          path: "add",
          element: <AddItem 
            onItemSubmit={props.onItemSubmit}
            typelist={props.typelist} 
          />
        },
        {
          path: "edit/:id",
          element: <EditItem 
            onItemSubmit={props.onItemSubmit}
            onItemDelete={props.onItemDelete}
            typelist={props.typelist} 
          />,
          loader: ({ params }) => {
            const item = props.data.filter(item => item.id === params.id).shift();
            if (item) {
              return { item };
            } else {
              throw new Response("Not Found", { status: 404 });
            }
          }
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;