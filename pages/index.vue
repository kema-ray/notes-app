<template>
    <div class="flex bg-zinc-900 h-screen">
        <!-- Sidebar -->
        <div class="bg-[#09090B] w-[338px] p-8">
            <Logo />
            <!-- today main container -->
            <div>
                <p class="text-[#C2C2C5] font-bold text-sm mt-12 mb-4">Today</p>
                <div class="ml-2 space-y-2">
                    <div v-for="note in todaysNotes"
                        :class="{ 'bg-[#A1842C]': selectedNote.id === note.id, 'hover:bg-[#A1842C]/50': selectedNote.id !== note.id }"
                        class="p-2 rounded-lg cursor-pointer" @click="selectedNote = note">
                        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">{{ note.text.substring(0, 50) }}</h3>
                        <div class="leading-snug truncate text-[#D6D6D6]">
                            <span class="text-xs text-[#D6D6D6]">{{
                                new Date(note.updatedAt).toDateString() ===
                                    new Date().toDateString()
                                    ? 'Today'
                                    : new Date(note.updatedAt).toLocaleDateString()
                            }}</span>
                            <span class="text-xs text-[#D6D6D6]">... {{ note.text.substring(50, 100) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /today main container -->

            <!-- yesterday main container -->
            <div>
                <p class="text-[#C2C2C5] font-bold text-sm mt-12 mb-4">Yesterday</p>
                <div class="ml-2 space-y-2">
                    <div v-for="note in yesterdaysNotes"
                        :class="{ 'bg-[#A1842C]': selectedNote.id === note.id, 'hover:bg-[#A1842C]/50': selectedNote.id !== note.id }"
                        class="p-2 rounded-lg cursor-pointer" @click="selectedNote = note">
                        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">{{ note.text.substring(0, 50) }}</h3>
                        <div class="leading-snug truncate text-[#D6D6D6]">
                            <span class="text-xs text-[#D6D6D6]">{{
                                new Date(note.updatedAt).toDateString() ===
                                    new Date().toDateString()
                                    ? 'Today'
                                    : new Date(note.updatedAt).toLocaleDateString()
                            }}</span>
                            <span class="text-xs text-[#D6D6D6]">... {{ note.text.substring(50, 100) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /yesterday main container -->

            <!-- everything else main container -->
            <div>
                <p class="text-[#C2C2C5] font-bold text-sm mt-12 mb-4">Earlier</p>
                <div class="ml-2 space-y-2">
                    <div v-for="note in earlierNotes"
                        :class="{ 'bg-[#A1842C]': selectedNote.id === note.id, 'hover:bg-[#A1842C]/50': selectedNote.id !== note.id }"
                        class="p-2 rounded-lg cursor-pointer" @click="selectedNote = note">
                        <h3 class="text-sm font-bold text-[#F4F4F5] truncate">{{ note.text.substring(0, 50) }}</h3>
                        <div class="leading-snug truncate text-[#D6D6D6]">
                            <span class="text-xs text-[#D6D6D6]">{{
                                new Date(note.updatedAt).toDateString() ===
                                    new Date().toDateString()
                                    ? 'Today'
                                    : new Date(note.updatedAt).toLocaleDateString()
                            }}</span>
                            <span class="text-xs text-[#D6D6D6]">... {{ note.text.substring(50, 100) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /everything else main container -->
        </div>
        <!--/sidebar -->

        <!-- note container -->
        <div class="w-full flex flex-col">
            <div class="flex justify-between items-start p-8 w-full">
                <button class="inline-flex items-center space-x-2 text-xs text-[#C2C2C5] hover:text-white font-bold">
                    <PencilIcon />
                    <span>Create Note</span>
                </button>
                <button>
                    <TrashIcon class="text-[#6D6D73] hover:text-white" />
                </button>
            </div>
            <div class="max-w-[437px] mx-auto w-full flex-grow flex flex-col">
                <p class="text-[#929292]">{{ new Date(selectedNote.updatedAt).toLocaleDateString() }}</p>
                <textarea v-model="updatedNote" name="note" id="note"
                    class="text-[#D4D4D4] my-4 font-playfair w-full bg-transparent focus:outline-none resize-none flex-grow"
                    @input="() => {
                        debouncedFn()
                        selectedNote.text = updatedNote
                    }"></textarea>
            </div>
        </div>
        <!-- /note container -->
    </div>
</template>

<script setup>
import { ref } from 'vue';

const notes = ref([]);
const selectedNote = ref({});
const updatedNote = ref({});

definePageMeta({
    middleware: ['auth'],
});

const todaysNotes = computed(() => {
    return notes.value.filter((note) => {
        const noteDate = new Date(note.updatedAt)
        return noteDate.toDateString() === new Date().toDateString()
    })
})

const yesterdaysNotes = computed(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return notes.value.filter((note) => {
        const noteDate = new Date(note.updatedAt)
        return noteDate.toDateString() === yesterday.toDateString()
    })
})

const earlierNotes = computed(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return notes.value.filter((note) => {
        const noteDate = new Date(note.updatedAt)
        return noteDate < yesterday && noteDate.toDateString() !== yesterday.toDateString()
    })
})

const debouncedFn = useDebounceFn(async () => {
    await updateNote()
}, 1000)

async function updateNote() {
    try {
        await $fetch(`/api/notes/${selectedNote.value.id}`, {
            method: 'PATCH',
            body: {
                updateNote: updatedNote.value
            }
        });
    } catch (err) {
        console.error(err);
    }
}

onMounted(async () => {
    notes.value = await $fetch('/api/notes');

    if (notes.value.length > 0) selectedNote.value = notes.value[0];

    updatedNote.value = selectedNote.value.text;
});
</script>