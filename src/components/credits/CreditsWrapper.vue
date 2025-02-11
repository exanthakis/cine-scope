<script setup lang="ts">
import { filterUniqueById } from '@/lib/utils'
import type { AvatarTextProps } from '@/types/general'
import { computed, ref } from 'vue'
import CreditsList from './CreditsList.vue'
import type { Credits } from '@/types/cast'

const { cast: castInfo, crew: crewInfo } = defineProps<Credits>()

const currentTab = ref<'Cast' | 'Crew'>('Cast')

const cast = computed<AvatarTextProps[]>(() => {
  const castList =
    castInfo?.map((castItem) => ({
      id: castItem.id,
      name: castItem.name,
      title: castItem.character,
      path: castItem.profile_path,
    })) ?? []

  return filterUniqueById(castList)
})

const crew = computed<AvatarTextProps[]>(() => {
  const crewList =
    crewInfo?.map((crewItem) => ({
      id: crewItem.id,
      name: crewItem.name,
      title: crewItem.job,
      path: crewItem.profile_path,
    })) ?? []

  return filterUniqueById(crewList)
})

const tabs = computed(() => ({
  Cast: { component: CreditsList, props: { credits: cast.value, type: 'Cast' } },
  Crew: { component: CreditsList, props: { credits: crew.value, type: 'Crew' } },
}))

const currentComponent = computed(() => tabs.value[currentTab.value])
</script>

<template>
  <div class="pb-10">
    <div class="mt-5 mb-7">
      <BaseButton
        v-for="(_, tab) in tabs"
        :key="tab"
        :mode="currentTab === tab ? 'primary' : 'secondary'"
        :isLink="false"
        @click="currentTab = tab"
      >
        {{ tab }}
      </BaseButton>
    </div>

    <component :is="currentComponent.component" v-bind="currentComponent.props"></component>
  </div>
</template>
