<template>
    <div class="flex bg-zinc-900 h-screen">
        <!-- Sidebar -->
        <div class="bg-[#09090B] w-[338px] p-8">
            <Logo />
            <!-- today main container -->
            <div>
                <p class="text-[#C2C2C5] font-bold text-sm mt-12 mb-4">Today</p>
                <div class="ml-2">
                    <div class="p-2 bg-[#A1842C] rounded-lg">
                        <h3 class="text-sm font-bold text-[#F4F4F5]">Just finished reading...</h3>
                        <div class="leading-snug">
                            <span class="text-xs text-[#F4F4F5] mr-4">Today</span>
                            <span class="text-xs text-[#D6D6D6]">Midnight Library...</span>
                        </div>
                    </div>
                    <div class="p-2">
                        <h3 class="text-sm font-bold text-[#F4F4F5]">Just finished reading...</h3>
                        <div class="leading-snug">
                            <span class="text-xs text-[#F4F4F5] mr-4">Today</span>
                            <span class="text-xs text-[#C2C2C5]">Midnight Library...</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /today main container -->

            <!-- yesterday main container -->
            <div>
                <p class="text-[#C2C2C5] font-bold text-sm mt-12 mb-4">Yesterday</p>
                <div class="ml-2">
                    <div class="p-2">
                        <h3 class="text-sm font-bold text-[#F4F4F5]">Just finished reading...</h3>
                        <div class="leading-snug">
                            <span class="text-xs text-[#F4F4F5] mr-4">Today</span>
                            <span class="text-xs text-[#C2C2C5]">Midnight Library...</span>
                        </div>
                    </div>
                    <div class="p-2">
                        <h3 class="text-sm font-bold text-[#F4F4F5]">Just finished reading...</h3>
                        <div class="leading-snug">
                            <span class="text-xs text-[#F4F4F5] mr-4">Today</span>
                            <span class="text-xs text-[#C2C2C5]">Midnight Library...</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /yesterday main container -->
        </div>
        <!--/sidebar -->

        <!-- note container -->
        <div class="w-full">
            <div class="flex justify-between items-start p-8 w-full">
                <button class="inline-flex items-center space-x-2 text-xs text-[#C2C2C5] hover:text-white font-bold">
                    <PencilIcon />
                    <span>Create Note</span>
                </button>
                <button>
                    <TrashIcon class="text-[#6D6D73] hover:text-white" />
                </button>
            </div>
            <div class="max-w-[437px] mx-auto">
                <p class="text-[#929292]">November 22nd, 2024</p>
                <p class="text-[#D4D4D4] my-4">Finally moved into my tiny house today! After months of YouTube tutorials,
                    countless trips to Home Depot, and more scrapes and bruises than I care to count, I'm officially a
                    tiny home dweller. The sunset streaming through my handmade stained glass window makes the whole 240
                    square feet glow like a jewel box. Still can't believe I built this with my own two hands (and Dad's
                    power tools).</p>
                <p class="text-[#D4D4D4] my-4">Living small means getting creative with space. Today I installed my fold-down
                    desk that transforms into a dining table - probably my proudest DIY achievement yet. The copper
                    pipes and reclaimed wood give it this amazing steampunk vibe I wasn't even planning. Had my first
                    meal on it tonight: takeout ramen and a victory beer, because after all that building, cooking was
                    definitely not happening.</p>
                <p class="text-[#D4D4D4]">My favorite spot is the reading nook by the window. I've got all my favorite
                    books within arm's reach, arranged by color because why not? The cushions I sewed last weekend
                    turned out surprisingly well, considering my last sewing project was a very lopsided pencil case in
                    7th grade. The fairy lights make everything feel magical at night, like I'm living in some kind of
                    woodland cottage rather than parked in my parents' backyard. Next project: figuring out how to grow
                    herbs in vertical planters without blocking my only source of natural light!</p>
            </div>
        </div>
        <!-- /note container -->
    </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
    middleware: ['auth'],
});
</script>