import { useApi, handleApiError, type ApiResponse } from './useApi'

export interface Guide {
    id: number | string
    title: string
    slug: string
    content: string
    excerpt?: string
    featuredImage?: string
    category?: string
    categoryTag?: string
    publishedAt?: string
    createdAt?: string
    updatedAt?: string
    isFeatured?: boolean
    author?: {
        id: number
        name: string
        email?: string
        avatar?: string
        bio?: string
    }
    relatedGuides?: Guide[]
    metaTitle?: string
    metaDescription?: string
}

export interface GuidesListResponse {
    status: boolean
    message: string
    count?: number
    data: Guide[]
}

export interface GuideDetailResponse {
    status: boolean
    message: string
    data: Guide
}

export const useGuidesApi = () => {
    const api = useApi()

    /**
     * Get all guides
     * GET /guides
     */
    const getGuides = async (params?: {
        category?: string
        search?: string
        limit?: number
        offset?: number
    }): Promise<ApiResponse<GuidesListResponse>> => {
        try {
            let url = '/guides'
            const queryParams = new URLSearchParams()

            if (params?.category) {
                queryParams.append('category', params.category)
            }
            if (params?.search) {
                queryParams.append('search', params.search)
            }
            if (params?.limit) {
                queryParams.append('limit', String(params.limit))
            }
            if (params?.offset) {
                queryParams.append('offset', String(params.offset))
            }

            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`
            }

            const response = await api.get<GuidesListResponse | Guide[]>(url)

            // Handle different response structures
            if (Array.isArray(response.data)) {
                return {
                    data: {
                        status: true,
                        message: 'Guides retrieved successfully',
                        data: response.data,
                        count: response.data.length,
                    },
                    message: 'Guides retrieved successfully',
                    success: true,
                }
            } else if (response.data && typeof response.data === 'object' && 'status' in response.data) {
                const wrappedResponse = response.data as GuidesListResponse
                return {
                    data: wrappedResponse,
                    message: wrappedResponse.message || 'Guides retrieved successfully',
                    success: wrappedResponse.status,
                }
            }

            return {
                data: {
                    status: false,
                    message: 'No guides found',
                    data: [],
                    count: 0,
                },
                message: 'No guides found',
                success: false,
            }
        } catch (error: any) {
            console.error('❌ Get guides error:', error)
            return {
                data: {
                    status: false,
                    message: handleApiError(error),
                    data: [],
                    count: 0,
                },
                message: handleApiError(error),
                success: false,
            }
        }
    }

    /**
     * Get a single guide by slug or ID
     * GET /guides/:slug or GET /guides/:id
     */
    const getGuideBySlug = async (slug: string): Promise<ApiResponse<Guide>> => {
        try {
            console.log('📡 Fetching guide from API:', `/guides/${slug}`)
            const response = await api.get<GuideDetailResponse | Guide>(`/guides/${slug}`)

            console.log('📡 API Response received:', {
                hasData: !!response.data,
                dataType: typeof response.data,
                isArray: Array.isArray(response.data),
                keys: response.data && typeof response.data === 'object' ? Object.keys(response.data) : null
            })

            // Handle different response structures
            if (response.data && typeof response.data === 'object') {
                if ('status' in response.data && 'data' in response.data) {
                    const wrappedResponse = response.data as GuideDetailResponse
                    console.log('📡 Wrapped response structure:', {
                        status: wrappedResponse.status,
                        message: wrappedResponse.message,
                        hasData: !!wrappedResponse.data,
                        dataKeys: wrappedResponse.data ? Object.keys(wrappedResponse.data) : null
                    })

                    if (wrappedResponse.data) {
                        console.log('📡 Guide data:', {
                            id: wrappedResponse.data.id,
                            title: wrappedResponse.data.title,
                            slug: wrappedResponse.data.slug,
                            hasContent: !!wrappedResponse.data.content,
                            contentLength: wrappedResponse.data.content?.length || 0,
                            contentPreview: wrappedResponse.data.content?.substring(0, 300) || '',
                            hasFeaturedImage: !!wrappedResponse.data.featuredImage,
                            featuredImage: wrappedResponse.data.featuredImage
                        })

                        // Check for images in content
                        if (wrappedResponse.data.content) {
                            const imgMatches = wrappedResponse.data.content.match(/<img[^>]+>/gi)
                            console.log(`🖼️ Found ${imgMatches?.length || 0} <img> tags in content HTML string`)
                            if (imgMatches) {
                                imgMatches.forEach((imgTag, i) => {
                                    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i)
                                    console.log(`  Image tag ${i + 1}:`, {
                                        tag: imgTag.substring(0, 100),
                                        src: srcMatch ? srcMatch[1] : 'NO SRC FOUND'
                                    })
                                })
                            }
                        }
                    }

                    return {
                        data: wrappedResponse.data,
                        message: wrappedResponse.message || 'Guide retrieved successfully',
                        success: wrappedResponse.status,
                    }
                } else {
                    // Direct guide object
                    console.log('📡 Direct guide object structure:', {
                        id: (response.data as Guide).id,
                        title: (response.data as Guide).title,
                        hasContent: !!(response.data as Guide).content
                    })

                    return {
                        data: response.data as Guide,
                        message: 'Guide retrieved successfully',
                        success: true,
                    }
                }
            }

            throw new Error('Invalid response format')
        } catch (error: any) {
            console.error('❌ Get guide by slug error:', error)
            console.error('❌ Error details:', {
                message: error.message,
                response: error.response,
                data: error.data
            })
            return {
                data: null as any,
                message: handleApiError(error),
                success: false,
            }
        }
    }

    /**
     * Get guide categories
     * GET /guides/categories
     */
    const getGuideCategories = async (): Promise<ApiResponse<string[]>> => {
        try {
            const response = await api.get<{ status: boolean; message: string; data: string[] } | string[]>('/guides/categories')

            if (Array.isArray(response.data)) {
                return {
                    data: response.data,
                    message: 'Categories retrieved successfully',
                    success: true,
                }
            } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
                return {
                    data: (response.data as any).data,
                    message: (response.data as any).message || 'Categories retrieved successfully',
                    success: (response.data as any).status || true,
                }
            }

            return {
                data: [],
                message: 'No categories found',
                success: false,
            }
        } catch (error: any) {
            console.error('❌ Get guide categories error:', error)
            return {
                data: [],
                message: handleApiError(error),
                success: false,
            }
        }
    }

    return {
        getGuides,
        getGuideBySlug,
        getGuideCategories,
    }
}

