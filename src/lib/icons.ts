import {
  Flower, FlowerTulip, FlowerLotus, Leaf, Plant,
  Heart, Star, Sparkle, Butterfly, Sun,
  type Icon,
} from "@phosphor-icons/react";
import type { IconId } from "@/types";

export const ICONS: Record<IconId, Icon> = {
  flower: Flower,
  tulip: FlowerTulip,
  lotus: FlowerLotus,
  leaf: Leaf,
  plant: Plant,
  heart: Heart,
  star: Star,
  sparkle: Sparkle,
  butterfly: Butterfly,
  sun: Sun,
};

export const ICON_LABELS: Record<IconId, string> = {
  flower: "Flower", tulip: "Tulip", lotus: "Lotus", leaf: "Leaf", plant: "Sprout",
  heart: "Heart", star: "Star", sparkle: "Sparkle", butterfly: "Butterfly", sun: "Sun",
};

export const ICON_IDS = Object.keys(ICONS) as IconId[];