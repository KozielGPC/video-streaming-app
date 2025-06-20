import { Button, Form, Input } from "antd";
import React from "react";

const { TextArea } = Input;

type EditorProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
};

export function CommentEditor({
  onChange,
  onSubmit,
  submitting,
  value,
}: EditorProps) {
  return (
    <Form onFinish={onSubmit}>
      <Form.Item>
        <TextArea
          rows={4}
          onChange={onChange}
          value={value}
          placeholder="Add a comment..."
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
} 