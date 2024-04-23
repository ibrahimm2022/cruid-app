
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = { records: [], isLoading: true, error: null, record: {} };

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",

  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:5000/post");
      const data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/post/${id}`);
      const data = res.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:5000/post/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const insertPost = createAsyncThunk(
  "post/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    try {
      const res = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const datas = await res.json();
      return datas;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const editPost = createAsyncThunk(
  "Posts/edit",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/post/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = res.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Post
    builder.addCase(fetchPost.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      state.record = {};
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.record = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Posts
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.records = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Insert
    builder.addCase(insertPost.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(insertPost.fulfilled, (state, action) => {
      state.records.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(insertPost.rejected, (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
    });
    // Delete
    builder.addCase(deletePost.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.records = state.records.filter((el) => el.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // Edit
    builder.addCase(editPost.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.record = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default PostSlice.reducer;
