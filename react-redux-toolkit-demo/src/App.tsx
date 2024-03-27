import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useGetUsersQuery, User } from "./features/api/apiSlice";
import {
  ordered as breadOrdered,
  restocked as breadRestocked,
} from "./features/bread/breadSlice";
import {
  ordered as cakeOrdered,
  restocked as cakeRestocked,
} from "./features/cake/cakeSlice";
// import { fetchUsers } from "./features/user/userSlice";

function App() {
  const [cakeValue, setCakeValue] = useState<number>(1);
  const [breadValue, setBreadValue] = useState<number>(1);

  const { noOfCakes } = useAppSelector((state) => state.cake);
  const { noOfBreads } = useAppSelector((state) => state.bread);
  const { isLoading, isSuccess, isError, error, data } = useGetUsersQuery();
  // const { loading, users, error } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Cakes - {noOfCakes}</h1>
        <input
          className="border-2"
          type="number"
          onChange={(e) => setCakeValue(parseInt(e.target.value))}
        />
        <div className="flex gap-3">
          <button
            className="bg-blue-500 text-white p-2 px-4"
            onClick={() => dispatch(cakeOrdered(cakeValue))}
          >
            Order
          </button>
          <button
            className="bg-blue-500 text-white p-2 px-4"
            onClick={() => dispatch(cakeRestocked(cakeValue))}
          >
            Restock
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Bread - {noOfBreads}</h1>
        <input
          className="border-2"
          type="number"
          onChange={(e) => setBreadValue(parseInt(e.target.value))}
        />
        <div className="flex gap-3">
          <button
            className="bg-blue-500 text-white p-2 px-4"
            onClick={() => dispatch(breadOrdered(breadValue))}
          >
            Order
          </button>
          <button
            className="bg-blue-500 text-white p-2 px-4"
            onClick={() => dispatch(breadRestocked(cakeValue))}
          >
            Restock
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">Users</h1>
        {isLoading ? <p>Loading</p> : <></>}
        <div className="flex flex-col gap-2">
          {isSuccess &&
            data?.map((user: User) => <p key={user.id}>{user.name}</p>)}
        </div>
        {isError ? <p>{String(error)}</p> : <></>}
      </div>
    </div>
  );
}

export default App;
