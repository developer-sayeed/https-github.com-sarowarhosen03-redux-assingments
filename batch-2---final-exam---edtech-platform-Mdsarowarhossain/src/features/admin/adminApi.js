import { apiSlice } from "../api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //update video cache in pasimistic way
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              const video = draft.find((video) => video.id === arg.id);
              Object.assign(video, data);
            })
          );
        } catch (error) {
          console.log("error at edit video mutation");
        }
      },
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //update video cache passimastic way

        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(data);
            })
          );
        } catch (error) {
          console.log("error at add video mutation");
        }
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "delete",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        //update video cache optimistic way
        const deletePatch = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            const index = draft.findIndex((video) => video.id === id);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deletePatch.undo();
        }
      },
    }),
    getAssignments: builder.query({
      query: (id) => `/assignments`,
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //update assignment cache in pasimistic way
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                const assignment = draft.find(
                  (assignment) => assignment.id === arg.id
                );
                Object.assign(assignment, data);
              }
            )
          );
        } catch (error) {
          console.log("error at edit assignments mutation");
        }
      },
    }),
    addAssignments: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //update Assignment cache passimastic way

        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(data);
              }
            )
          );
        } catch (error) {
          console.log("error at add assignments mutation");
        }
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "delete",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        //update Assignment cache optimistic way
        const updateAssignmentPatch = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignments",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (assignment) => assignment.id === id
              );
              draft.splice(index, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateAssignmentPatch.undo();
        }
      },
    }),
    getQuizes: builder.query({
      query: () => `/quizzes`,
    }),
    addQuize: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //update quiz cache passimastic way

        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizes", undefined, (draft) => {
              draft.push(data);
            })
          );
        } catch (error) {
          console.log("error at add quiz mutation");
        }
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //update quiz cache in pasimistic way
        try {
          const { data } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getQuizes", undefined, (draft) => {
              const quiz = draft.find((quiz) => quiz.id === arg.id);
              Object.assign(quiz, data);
            })
          );
        } catch (error) {
          console.log("error at edit quiz mutation");
        }
      },
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "delete",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const updateQuizPatch = dispatch(
          apiSlice.util.updateQueryData("getQuizes", undefined, (draft) => {
            const index = draft.findIndex((quiz) => quiz.id === id);
            draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateQuizPatch.undo();
        }
      },
    }),
    getAssignmentMark: builder.query({
      query: () => `/assignmentMark`,
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        //update quiz cache in optimistic way
        const updateAssignmentMarkPatch = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMark",
            undefined,
            (draft) => {
              const mark = draft.find((mark) => mark.id === id);
              Object.assign(mark, data);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateAssignmentMarkPatch.undo();
          console.log("error at edit assignment mark mutation");
        }
      },
    }),
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "delete",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deletePatch = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMark",
            undefined,
            (draft) => {
              const index = draft.findIndex((mark) => mark.id === id);
              draft.splice(index, 1);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deletePatch.undo();
        }
      },
    }),
  }),
});
export const {
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
  useGetAssignmentsQuery,
  useEditAssignmentMutation,
  useAddAssignmentsMutation,
  useDeleteAssignmentMutation,
  useGetQuizesQuery,
  useAddQuizeMutation,
  useEditQuizMutation,
  useGetAssignmentMarkQuery,
  useEditAssignmentMarkMutation,
} = adminApi;
