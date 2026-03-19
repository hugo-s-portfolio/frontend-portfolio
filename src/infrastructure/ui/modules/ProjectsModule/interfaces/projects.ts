export interface Projects {
    [key: string]: unknown
}

export interface ProjectItem {
    id: number
    title: string
    description: string
    image: string
    technologies: string[]
    github_url?: string
    demo_url?: string
    show: boolean
    order: number
}
