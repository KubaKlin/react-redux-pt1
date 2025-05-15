import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3010' }),
  tagTypes: ['Articles'],
  endpoints: builder => ({
    getArticles: builder.query({
      query: () => '/articles',
      providesTags: ['Articles']
    }),
    deleteArticle: builder.mutation({
      query: (articleId) => ({
        url: `/articles/${articleId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Articles']
    }),
    editArticle: builder.mutation({
      query: ({ id, ...articleData }) => ({
        url: `/articles/${id}`,
        method: 'PUT',
        body: articleData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Articles']
    })
  })
})

export const { useGetArticlesQuery, useDeleteArticleMutation, useEditArticleMutation } = api;