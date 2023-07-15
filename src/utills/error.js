import { getLocalizedText } from "@/locale"

export function error(code) {
    return getLocalizedText(code) ? getLocalizedText(code) : getLocalizedText("NotKnownError")
}