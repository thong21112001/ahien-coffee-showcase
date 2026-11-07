import test from "node:test";
import assert from "node:assert";
import {
  contactSubmissionSchema,
  dataSubjectRequestSchema,
} from "../server/schemas/contact.schema.ts";

test("Privacy & Consent: Submitting contact without required operational consent fails", () => {
  const payloadWithoutConsent = {
    fullName: "Nguyễn Văn A",
    phone: "0901234567",
    email: "nguyenvana@example.com",
    inquiryType: "TABLE_RESERVATION",
    message: "Đặt bàn 4 người vào tối nay",
    consentOperational: false, // NOT checked
    consentMarketing: false,
  };

  const result = contactSubmissionSchema.safeParse(payloadWithoutConsent);
  assert.strictEqual(result.success, false, "Must reject when consentOperational is false");
  if (!result.success) {
    const consentIssue = result.error.issues.find(
      (i) => i.path[0] === "consentOperational"
    );
    assert.ok(consentIssue, "Must report issue on consentOperational");
  }
});

test("Privacy & Consent: Marketing consent is independent and optional", () => {
  const payloadWithOnlyOperationalConsent = {
    fullName: "Trần Thị B",
    phone: "0912345678",
    email: "tranthib@example.com",
    inquiryType: "GENERAL_INQUIRY",
    message: "Tư vấn cà phê Arabica Cầu Đất",
    consentOperational: true, // Checked
    consentMarketing: false, // Optional: Unchecked
  };

  const result = contactSubmissionSchema.safeParse(payloadWithOnlyOperationalConsent);
  assert.strictEqual(
    result.success,
    true,
    "Should succeed when operational consent is true, regardless of marketing consent"
  );
  if (result.success) {
    assert.strictEqual(result.data.consentMarketing, false);
  }
});

test("Privacy & Consent: Honeypot field traps bot submissions", () => {
  const botPayload = {
    fullName: "Spam Bot",
    phone: "0987654321",
    consentOperational: true,
    botField: "http://malicious-spam-url.com", // Bot filled hidden field
  };

  const result = contactSubmissionSchema.safeParse(botPayload);
  assert.strictEqual(result.success, true);
  if (result.success) {
    assert.ok(result.data.botField && result.data.botField.length > 0);
  }
});

test("Privacy & Consent: Validates phone number and name boundaries", () => {
  // Invalid short name
  const invalidName = contactSubmissionSchema.safeParse({
    fullName: "A",
    phone: "0901234567",
    consentOperational: true,
  });
  assert.strictEqual(invalidName.success, false);

  // Invalid short phone
  const invalidPhone = contactSubmissionSchema.safeParse({
    fullName: "Lê Văn C",
    phone: "123",
    consentOperational: true,
  });
  assert.strictEqual(invalidPhone.success, false);
});

test("DSR: Data Subject Request schema validates request types", () => {
  const validDsr = dataSubjectRequestSchema.safeParse({
    requestType: "DELETION",
    requesterName: "Hoàng Văn D",
    requesterPhone: "0934567890",
    requesterEmail: "hoangd@example.com",
    details: "Tôi muốn yêu cầu xóa toàn bộ thông tin liên hệ cũ của tôi.",
  });
  assert.strictEqual(validDsr.success, true);

  const invalidDsr = dataSubjectRequestSchema.safeParse({
    requestType: "INVALID_ACTION",
    requesterName: "Hoàng Văn D",
    requesterPhone: "0934567890",
    requesterEmail: "invalid-email",
    details: "123",
  });
  assert.strictEqual(invalidDsr.success, false);
});
