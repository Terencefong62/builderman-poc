import { EMPTY_CONTACT, type ContactInfo } from '../data/contact'
import {
  BUDGET_DEFAULT_MAX_WAN,
  BUDGET_DEFAULT_MIN_WAN,
  clampBudgetWan,
  EMPTY_UNIT_DETAILS,
  type UnitDetails,
} from '../data/property'

const KEY = 'builderman-match-draft'

export type MatchDraft = {
  styles: string[]
  uploadedFileNames: string[]
  unit: UnitDetails
  contact: ContactInfo
}

const EMPTY_DRAFT: MatchDraft = {
  styles: [],
  uploadedFileNames: [],
  unit: EMPTY_UNIT_DETAILS,
  contact: EMPTY_CONTACT,
}

type LegacyUnit = Partial<UnitDetails> & {
  budgetWan?: number
}

function normalizeUnit(raw: LegacyUnit | undefined): UnitDetails {
  const merged = { ...EMPTY_UNIT_DETAILS, ...raw }

  let budgetMinWan =
    typeof merged.budgetMinWan === 'number'
      ? clampBudgetWan(merged.budgetMinWan)
      : typeof merged.budgetWan === 'number'
        ? clampBudgetWan(Math.max(0, merged.budgetWan - 20))
        : BUDGET_DEFAULT_MIN_WAN

  let budgetMaxWan =
    typeof merged.budgetMaxWan === 'number'
      ? clampBudgetWan(merged.budgetMaxWan)
      : typeof merged.budgetWan === 'number'
        ? clampBudgetWan(merged.budgetWan)
        : BUDGET_DEFAULT_MAX_WAN

  if (budgetMinWan > budgetMaxWan) {
    ;[budgetMinWan, budgetMaxWan] = [budgetMaxWan, budgetMinWan]
  }

  return {
    ...merged,
    budgetMinWan,
    budgetMaxWan,
    toilets: Math.max(1, merged.toilets ?? 1),
  }
}

function normalizeContact(raw: Partial<ContactInfo> | undefined): ContactInfo {
  return {
    ...EMPTY_CONTACT,
    ...raw,
  }
}

export function loadMatchDraft(): MatchDraft {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return EMPTY_DRAFT
    const parsed = JSON.parse(raw) as Partial<MatchDraft>
    return {
      styles: parsed.styles ?? [],
      uploadedFileNames: parsed.uploadedFileNames ?? [],
      unit: normalizeUnit(parsed.unit),
      contact: normalizeContact(parsed.contact),
    }
  } catch {
    return EMPTY_DRAFT
  }
}

export function saveMatchDraft(partial: Partial<MatchDraft>) {
  const current = loadMatchDraft()
  const next: MatchDraft = {
    ...current,
    ...partial,
    unit: normalizeUnit(partial.unit ?? current.unit),
    contact: normalizeContact(partial.contact ?? current.contact),
  }
  sessionStorage.setItem(KEY, JSON.stringify(next))
}
