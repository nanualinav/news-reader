import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  });

  export const postCommentForArticleId = createAsyncThunk(
    'comments/postCommentForArticleId',
    async ({articleId, comment}) => {
      const requestBody = JSON.stringify({comment: comment});
      const response = await fetch(`api/articles/${articleId}`, {
        method: 'POST',
        body: requestBody
      });
      const json = await response.json();
  
      return json;
    }
  )

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false
  },
    extraReducers: (builder) => {
      builder
      .addCase(loadCommentsForArticleId.pending, (state) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
        state.byArticleId = action.payload;
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
      })
      .addCase(loadCommentsForArticleId.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      })
      .addCase(postCommentForArticleId.pending, (state) => {
        state.isLoadingComments = true;
        state.failedToCreateComment = false;
      })
      .addCase(postCommentForArticleId.fulfilled, (state, action) => {
        state.byArticleId[action.payload.articleId].push(action.payload);
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
      })
      .addCase(postCommentForArticleId.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      })
    }
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
