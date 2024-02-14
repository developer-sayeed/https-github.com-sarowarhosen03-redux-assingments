import apiSlice from "../api/apiSlice";
import { setProjects } from "./taskManagerSlice";

export const taskManagerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),

    getTeamInfo: builder.query({
      query: () => "/team",
    }),
    getProjects: builder.query({
      query: () => "/projects",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          let data = await queryFulfilled;
          dispatch(setProjects(data.data));
        } catch (error) {}
      },
    }),
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    addTask: builder.mutation({
      query: (body) => ({
        url: "/tasks",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(res.data);
            })
          );
        } catch (error) {}
      },
    }),
    changeTaskStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateData = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((t) => t.id == arg.id);
            task.status = arg.data.status;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateData.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              const index = draft.findIndex((t) => t.id == arg.id.toString());
              if (index != -1) draft[index] = res.data;
            })
          );
          dispatch(
            apiSlice.util.updateQueryData(
              "getTask",
              arg.id.toString(),
              (draft) => {
                Object.assign(draft, res.data);
              }
            )
          );
        } catch (error) {}
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateData2 = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((t) => t.id == arg);
            if (index != -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateData2.undo();
        }
      },
    }),
  }),
});
export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useGetTeamInfoQuery,
  useGetProjectsQuery,
  useChangeTaskStatusMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddTaskMutation,
} = taskManagerApi;
