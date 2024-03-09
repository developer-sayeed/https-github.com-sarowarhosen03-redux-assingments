import { apiSlice } from "../api/apiSlice";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => `/videos`,
      keepUnusedDataFor: 6 * 60,
    }),

    getAssigmentDetails: builder.query({
      async queryFn(
        { studentId, videoId },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        try {
          // get a the assignment for the current video
          const assignment = await fetchWithBQ(
            `/assignments?video_id_like=${videoId}`
          );
          if (assignment.error) return { error: assignment.error };
          // get the assignment mark for the current video and student assignment
          const assignmentMark = await fetchWithBQ(
            `/assignmentMark?student_id_like=${studentId}&assignment_id_like=${assignment?.data?.[0]?.id}`
          );
          if (assignmentMark.error) return { error: assignmentMark.error };

          //return the final data
          return {
            data: {
              assignment: assignment.data,
              assignementMark: assignmentMark.data,
            },
          };
        } catch (error) {
          //hnadle the error
          return { error: error };
        }
      },
    }),
    submitAssignment: builder.mutation({
      query: ({ data }) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ data, videoId }, { queryFulfilled, dispatch }) {
        try {
          const { data: asingmentMark } = await queryFulfilled;

          //start Pessimistic update
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssigmentDetails",
              {
                studentId: data.student_id,
                videoId,
              },
              (draft) => {
                draft.assignementMark.push(asingmentMark);
              }
            )
          );

          //end Pessimistic update

          //start Pessimistic update for LeaderBoard
          dispatch(
            apiSlice.util.updateQueryData(
              "getLeaderBoard",
              undefined,
              (draft) => {
                draft.assignmentMarks.push(data);
              }
            )
          );

          //end Pessimistic update
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getQuizeDetails: builder.query({
      async queryFn(
        { studentId, videoId },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) {
        try {
          //get the quize for the current video
          const quizzes = await fetchWithBQ(
            `/quizzes?video_id_like=${videoId}`
          );
          if (quizzes.error) return { error: quizzes.error };

          // get the quize mark for the current video and student
          const quizeMark = await fetchWithBQ(
            `/quizMark?student_id_like=${studentId}&video_id_like=${videoId}`
          );
          if (quizeMark.error) return { error: quizeMark.error };

          //return the final data
          return {
            data: {
              quize: quizzes.data,
              quizeMark: quizeMark.data,
            },
          };
        } catch (error) {
          //hnadle the error
          return { error: error };
        }
      },
    }),
    submitQuize: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          //start Pessimistic update for quize mark
          dispatch(
            apiSlice.util.updateQueryData(
              "getQuizeDetails",
              {
                studentId: arg.student_id,
                videoId: arg.video_id,
              },
              (draft) => {
                draft.quizeMark.push(data);
              }
            )
          );

          //end Pessimistic update

          //start Pessimistic update for LeaderBoard
          dispatch(
            apiSlice.util.updateQueryData(
              "getLeaderBoard",
              undefined,
              (draft) => {
                draft.quizeMarks.push(data);
              }
            )
          );

          //end Pessimistic update
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getLeaderBoard: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get the student list
        const studentList = await fetchWithBQ(`/users`);
        if (studentList.error) return { error: studentList.error };

        // get the quize marks
        const quizeMarks = await fetchWithBQ(`/quizMark`);
        if (quizeMarks.error) return { error: quizeMarks.error };

        // get the assignment marks
        const assignmentMarks = await fetchWithBQ(
          `/assignmentMark`
        );
        if (assignmentMarks.error) return { error: assignmentMarks.error };

        //return the final data
        return {
          data: {
            assignmentMarks: assignmentMarks.data,
            quizeMarks: quizeMarks.data,
            studentList: studentList.data,
          },
        };
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetAssigmentDetailsQuery,
  useSubmitAssignmentMutation,
  useGetQuizeDetailsQuery,
  useSubmitQuizeMutation,
  useGetLeaderBoardQuery,
} = studentApi;
