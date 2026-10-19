# Tạo Next.js API Route

## Tổng Quan
Tạo API route mới trong Next.js App Router với validation, error handling đầy đủ.

## Các Bước
1. **Tạo route file**
   - Tạo `app/api/{route-name}/route.ts`
   - Export named functions: GET, POST, PUT, DELETE, PATCH
   - Tuân theo @nextjs-api rule

2. **Implement handlers**
   - Sử dụng NextRequest và NextResponse
   - Validate input với zod
   - Handle errors properly

3. **Thêm TypeScript types**
   - Định nghĩa request/response types
   - Tạo types file nếu cần

4. **Thêm error handling**
   - Try-catch blocks
   - Proper status codes
   - Error messages rõ ràng

## Ví Dụ Template

### GET Handler
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

### POST Handler Với Validation
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createUserSchema.parse(body);
    
    // Create user
    const user = await createUser(validatedData);
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

### Dynamic Route
```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserById(params.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const user = await updateUser(params.id, body);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteUser(params.id);
    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
```

### Với Query Parameters
```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  
  const users = await getUsers({
    page: parseInt(page),
    limit: parseInt(limit),
  });
  
  return NextResponse.json(users);
}
```

## Checklist
- [ ] Route file được tạo
- [ ] Handlers được implement
- [ ] Validation với zod
- [ ] Error handling đầy đủ
- [ ] TypeScript types
- [ ] Status codes phù hợp
- [ ] Logging cho debugging
