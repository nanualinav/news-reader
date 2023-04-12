import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id) => {
    const response = await
    fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json; 
  }
)


// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    isLoadingComments: false,
    failedToLoadComments: false,
    byArticleId: { 
    }
  },
    extraReducers: {
      [loadCommentsForArticleId.pending]: (state, action) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      },
      [loadCommentsForArticleId.fulfilled]: (state, action) => {
        byArticleId = action.payload;
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
      },
      [loadCommentsForArticleId.rejected]: (state, action) => {
        state.failedToLoadComments = false;
        state.isLoadingComments = false;
      }
    }
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
