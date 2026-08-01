import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

/* -------------------------------------------------------------------------- */
/*                                Hero Schema                                 */
/* -------------------------------------------------------------------------- */

const HeroHighlightSchema = new Schema(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const SocialLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const ButtonSchema = new Schema(
  {
    label: String,
    href: String,
  },
  { _id: false }
);

const HeroSchema = new Schema(
  {
    role: String,
    location: String,
    availability: String,

    headline: String,
    description: String,

    highlights: [HeroHighlightSchema],

    primaryCTA: ButtonSchema,
    secondaryCTA: ButtonSchema,

    socialLinks: [SocialLinkSchema],
  },
  { _id: false }
);

/* -------------------------------------------------------------------------- */
/*                               About Schema                                 */
/* -------------------------------------------------------------------------- */

const AboutStatSchema = new Schema(
  {
    value: String,
    label: String,
  },
  { _id: false }
);

const AboutSchema = new Schema(
  {
    headline: String,

    paragraphs: [
      {
        type: String,
      },
    ],

    stats: [AboutStatSchema],

    name: String,
    email: String,
    location: String,
    availability: String,

    portrait: String,
  },
  { _id: false }
);

/* -------------------------------------------------------------------------- */
/*                            Experience Schema                               */
/* -------------------------------------------------------------------------- */

const ExperienceSchema = new Schema(
  {
    period: String,

    title: String,

    company: String,

    location: String,

    description: String,

    achievements: [String],

    skills: [String],
  },
  { _id: false }
);

/* -------------------------------------------------------------------------- */
/*                               Project Schema                               */
/* -------------------------------------------------------------------------- */

const ProjectSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },

    title: String,

    description: String,

    image: String,

    tags: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    link: String,

    code: String,
  },
  { _id: false }
);

/* -------------------------------------------------------------------------- */
/*                               Profile Schema                               */
/* -------------------------------------------------------------------------- */

const SkillCategorySchema = new Schema(
  {
    category: String,

    items: [String],
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    degree: String,

    institution: String,

    university: String,

    period: String,

    gpa: String,

    description: String,
  },
  { _id: false }
);

const CertificationSchema = new Schema(
  {
    name: String,

    issuer: String,

    year: String,
  },
  { _id: false }
);

const LanguageSchema = new Schema(
  {
    name: String,

    proficiency: String,
  },
  { _id: false }
);

const ProfileSchema = new Schema(
  {
    skills: [SkillCategorySchema],

    education: [EducationSchema],

    certifications: [CertificationSchema],

    languages: [LanguageSchema],
  },
  { _id: false }
);

/* -------------------------------------------------------------------------- */
/*                              Contact Schema                                */
/* -------------------------------------------------------------------------- */

const ContactSchema = new Schema(
  {
    email: String,

    phone: String,

    location: String,
  },
  { _id: false }
);

/* -------------------------------------------------------------------------- */
/*                              Root Content                                  */
/* -------------------------------------------------------------------------- */

const ContentSchema = new Schema(
  {
    hero: HeroSchema,

    about: AboutSchema,

    experience: [ExperienceSchema],

    profile: ProfileSchema,

    projects: [ProjectSchema],

    contact: ContactSchema,
  },
  {
    timestamps: true,
  }
);

export default models.Content || model("Content", ContentSchema);