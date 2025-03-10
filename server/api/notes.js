// /api/notes returns all notes

export default defineEventHandler(async (event) => {
    try {
        const notes = await prisma.note.findMany()
            return notes
    } catch (error) {
        console.log(error)
    }
});