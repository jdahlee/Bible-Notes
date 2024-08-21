"""Add Source model and relationship to Note

Revision ID: 7bebba3fb3b2
Revises: ce0e60fe4393
Create Date: 2024-08-17 12:06:09.812244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bebba3fb3b2'
down_revision = 'ce0e60fe4393'
branch_labels = None
depends_on = None


def upgrade():
    # Create Source table if it doesn't exist
    op.create_table('source',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )

    # Modify Note table
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('source_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_note_source', 'source', ['source_id'], ['id'])
        batch_op.drop_column('source')

def downgrade():
    # Revert Note table changes
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.add_column(sa.Column('source', sa.VARCHAR(length=200), nullable=True))
        batch_op.drop_constraint('fk_note_source', type_='foreignkey')
        batch_op.drop_column('source_id')

    # Drop Source table
    op.drop_table('source')

    # ### end Alembic commands ###
