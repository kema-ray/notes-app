// api/user

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        })
        return { data: 'success' }
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Error creating user'
        })
    }
})