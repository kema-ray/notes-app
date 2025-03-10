import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const id = await getRouterParam(event, 'id');

        const cookies = parseCookies(event)
        const token = cookies.NoteNestJWT

        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Not authorized to update notes',
            })
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        const noteTryingToUpdate = await prisma.note.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (noteTryingToUpdate) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Not authorized to update notes',
            })
        }

        if (noteTryingToUpdate.userId !== decodedToken.id) {
            throw createError({
              statusCode: 401,
              statusMessage: 'Does not have permission to update note',
            })
          }      

        await prisma.note.update({
            where: {
                id: Number(id),
            },
            data: {
                text: body.updatedNote
            },
        });
    } catch (error) {
        console.log(error.code);
        throw error;
    }
});